import React, { useState, useEffect, useCallback, useRef, useMemo, useLayoutEffect } from 'react';
import { ConversationTree, TerminalOption, WindowId } from '../../types';
import { CONVERSATION_TREE } from '@/constants'; // Changed from ../../constants

interface ReadmeWindowContentProps {
  onOpenWindow: (windowId: WindowId) => void;
  isActive: boolean; // To control keyboard listener
}

interface OutputLine {
  id: string;
  text: string;
  type: 'bot' | 'user' | 'prompt' | 'options';
  options?: TerminalOption[];
}

const ReadmeWindowContent: React.FC<ReadmeWindowContentProps> = ({ onOpenWindow, isActive }) => {
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentOptions, setCurrentOptions] = useState<TerminalOption[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [waitingForEnter, setWaitingForEnter] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
  const uniqueIdCounter = useRef(0);

  const startReadmeRef = useRef<() => void>(() => {});

    const dynamicConversationTree: ConversationTree = useMemo(() => ({
    ...CONVERSATION_TREE,
    final_options: {
      ...CONVERSATION_TREE.final_options,
      options: [
        { text: "Replay Transmission", action: () => startReadmeRef.current() },
        { text: "Send Transmission", action: () => onOpenWindow(WindowId.CONTACT) },
        { text: "View Active Bounties", action: () => onOpenWindow(WindowId.PROJECTS) }
      ]
    }
  }), [onOpenWindow]);

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  const addLine = (line: Omit<OutputLine, 'id'>) => {
    setOutputLines(prev => [...prev, { ...line, id: `line-${uniqueIdCounter.current++}` }]);
    scrollToBottom();
  };

  const typeNodeText = useCallback(async (nodeKey: string) => {
    const node = dynamicConversationTree[nodeKey];
    if (!node) return;

    setIsTyping(true);
    for (const line of node.text) {
      let currentLineText = '> ';
      addLine({ text: currentLineText, type: 'bot' });
      for (let i = 0; i < line.length; i++) {
        currentLineText += line[i];
        setOutputLines(prev => prev.map(l => l.id === `line-${uniqueIdCounter.current -1}` ? {...l, text: currentLineText} : l));
        scrollToBottom();
        await new Promise(resolve => timeoutIdsRef.current.push(setTimeout(resolve, 20)));
      }
    }
    setIsTyping(false);

    setCurrentOptions(node.options || []);
    setSelectedOptionIndex(0);

    if (node.options && node.options.length === 1 && node.options[0].text === "Continue...") {
      setWaitingForEnter(true);
      addLine({ text: "[Press Enter to continue...]", type: 'prompt' });
    } else if (node.options && node.options.length > 0) {
      addLine({ text: "", type: 'options', options: node.options });
    }
  }, [dynamicConversationTree]);

  const startReadme = useCallback(() => {
    setOutputLines([]);
    uniqueIdCounter.current = 0;

    setIsTyping(false);
    setWaitingForEnter(false);
    setCurrentOptions([]);
    setSelectedOptionIndex(0);
    typeNodeText('start');
  }, [typeNodeText]);

  useLayoutEffect(() => {
    startReadmeRef.current = startReadme;
  }, [startReadme]);

  // Initial loading effect with delay
  useEffect(() => {
    // Add loading message
    setOutputLines([{ id: 'loading', text: '🛰️ Incoming Transmission', type: 'bot' }]);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      startReadmeRef.current = startReadme;
      startReadme();
    }, 2000); // 2 second delay before starting

    return () => {
      clearTimeout(loadingTimer);
      timeoutIdsRef.current.forEach(clearTimeout);
      timeoutIdsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount, with cleanup

  const handleOptionSelect = useCallback((option: TerminalOption) => {
    if (isTyping) return;

    // Remove previous options/prompt
    setOutputLines(prev => prev.filter(l => l.type !== 'options' && l.type !== 'prompt'));

    addLine({ text: `< ${option.text}`, type: 'user' });
    setCurrentOptions([]);
    setWaitingForEnter(false);

    if (option.action) {
      option.action();
      // Potentially reset or allow further interaction after action
    } else if (option.next) {

      timeoutIdsRef.current.push(setTimeout(() => typeNodeText(option.next!), 300));

    }
  }, [isTyping, typeNodeText]);


  const proceedWithEnter = useCallback(() => {
    if (waitingForEnter && currentOptions.length > 0) {
      handleOptionSelect(currentOptions[0]);
    }
  }, [waitingForEnter, currentOptions, handleOptionSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive || isTyping) return;

      if (waitingForEnter && e.key === 'Enter') {
        e.preventDefault();
        proceedWithEnter();
      } else if (currentOptions.length > 0 && !waitingForEnter) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedOptionIndex(prev => (prev + 1) % currentOptions.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedOptionIndex(prev => (prev - 1 + currentOptions.length) % currentOptions.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (currentOptions[selectedOptionIndex]) {
            handleOptionSelect(currentOptions[selectedOptionIndex]);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isTyping, waitingForEnter, currentOptions, selectedOptionIndex, proceedWithEnter, handleOptionSelect]);

  useEffect(scrollToBottom, [outputLines]);

  return (
    <div
      ref={contentRef}
      className="h-full terminal-style p-4 sm:p-5 overflow-y-auto font-['JetBrains_Mono'] text-zinc-100 bg-transparent text-[13px] sm:text-sm leading-relaxed"
      style={{
        height: '100%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        wordBreak: 'break-word',
        boxSizing: 'border-box',
      }}
    >
      {outputLines.map((line) => (
        <div key={line.id} className="mb-2">
          {line.id === 'loading' ? (
            <div className="flex items-center text-zinc-300">
              <span>{line.text}</span>
              {isLoading && (
                <span className="ml-2 inline-flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <span
                      key={dot}
                      className="inline-block w-1.5 h-1.5 bg-zinc-200 rounded-full animate-bounce"
                      style={{
                        animationDelay: `${dot * 0.15}s`,
                        animationDuration: '1s',
                      }}
                    />
                  ))}
                </span>
              )}
            </div>
          ) : (
            <>
              {line.type === 'user' && (
                <p className="text-zinc-400 break-words py-0.5">{line.text}</p>
              )}
              {line.type === 'bot' && (
                <p className="text-zinc-100 break-words">
                  {line.text}
                  {isTyping && outputLines[outputLines.length - 1].id === line.id && (
                    <span className="inline-block w-2 h-4 bg-white blinking-cursor-anim ml-1.5 align-middle shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
                  )}
                </p>
              )}
              {line.type === 'prompt' && (
                <p className="cursor-pointer text-zinc-300 break-words" onClick={proceedWithEnter}>
                  {line.text}{' '}
                  <span className="inline-block w-2 h-4 bg-white blinking-cursor-anim ml-1.5 align-middle shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
                </p>
              )}
              {line.type === 'options' && line.options && (
                <div className="mt-3 space-y-1.5">
                  {line.options.map((opt, index) => {
                    const isSelected = index === selectedOptionIndex;
                    return (
                      <div
                        key={index}
                        className={`terminal-option cursor-pointer py-2 px-3 rounded-lg border transition-all duration-150 flex items-center gap-2 ${
                          isSelected
                            ? 'bg-white text-zinc-950 border-white font-medium shadow-[0_4px_20px_rgba(255,255,255,0.18)]'
                            : 'bg-white/[0.03] text-zinc-200 border-white/[0.08] hover:bg-white/[0.09] hover:border-white/20 hover:text-white'
                        }`}
                        onClick={() => handleOptionSelect(opt)}
                      >
                        <span className={isSelected ? 'text-zinc-950 font-semibold' : 'text-zinc-500'}>
                          {isSelected ? '›' : '·'}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      ))}
      {isTyping && outputLines.length > 0 && outputLines[outputLines.length - 1].type !== 'bot' && !isLoading && (
        <span className="inline-block w-2 h-4 bg-white blinking-cursor-anim ml-1.5 align-middle shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
      )}
      {!isTyping &&
        !waitingForEnter &&
        currentOptions.length === 0 &&
        outputLines.length > 0 &&
        outputLines[outputLines.length - 1].type !== 'options' &&
        !isLoading && (
          <span className="inline-block w-2 h-4 bg-white blinking-cursor-anim ml-1.5 align-middle shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
        )}
    </div>
  );
};

export default ReadmeWindowContent;
