
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Avatar from '../Avatar';
import { ResumeCategory } from '../../types';
import { RESUME_DATA } from '@/constants'; // Changed from ../../constants

const InfoWindowContent: React.FC = () => {
  const [age, setAge] = useState<number | null>(null);
  const [hijriDOB, setHijriDOB] = useState<string>('16/4/1417'); // Fallback
  const [selectedCategory, setSelectedCategory] = useState<ResumeCategory | null>(null);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateAge = (birthDate: string): number => {
      const today = new Date();
      const birth = new Date(birthDate);
      let currentAge = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        currentAge--;
      }
      return currentAge;
    };
    setAge(calculateAge('1996-08-30'));

    try {
      const dob = new Date('1996-08-30');
      const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setHijriDOB(hijriFormatter.format(dob));
    } catch (e) {
      console.error("Could not calculate Hijri date.", e);
      // Fallback is already set
    }
  }, []);

  const typeCategoryData = useCallback(async (category: ResumeCategory) => {
    const data = RESUME_DATA[category];
    if (!data) return;

    setIsTyping(true);
    setTypedLines([`[Accessing records for: ${category.toUpperCase()}]`]);
    await new Promise(resolve => setTimeout(resolve, 300));

    for (const line of data) {
      let currentLineText = '> ';
      setTypedLines(prev => [...prev, currentLineText]);
      for (let i = 0; i < line.length; i++) {
        currentLineText += line[i];
         setTypedLines(prev => {
            const newLines = [...prev];
            newLines[newLines.length -1] = currentLineText;
            return newLines;
        });
        if (contentRef.current) contentRef.current.scrollTop = contentRef.current.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 15));
      }
    }
    setIsTyping(false);
  }, []);


  const handleShowInfo = (category: ResumeCategory) => {
    setSelectedCategory(category);
    setTypedLines([]);
    typeCategoryData(category);
  };

  const resetInfoView = () => {
    setSelectedCategory(null);
    setTypedLines([]);
    setIsTyping(false);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [typedLines]);

  return (
    <div
      ref={contentRef}
      className="h-full terminal-style p-4 sm:p-5 overflow-y-auto font-['JetBrains_Mono'] text-zinc-100 bg-transparent text-[13px] sm:text-sm"
    >
      {!selectedCategory ? (
        <>
          <div className="mb-4">
            <div className="flex gap-4 items-center mb-4">
              <Avatar src="https://i.imgur.com/v8iI51q.jpeg" alt="Profile Picture" />
              <div className="min-w-0">
                <h3 className="font-['Cairo'] text-lg sm:text-xl font-semibold text-white">
                  داود بن داود الجهاد عبدالله
                </h3>
                <h4 className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base font-medium text-zinc-300 tracking-tight">
                  Dawud Bin Dawud Al Jihad Abduallah
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs tabular-nums border-t border-white/[0.08] pt-3">
              <p className="text-zinc-400">
                Age <span className="text-zinc-600 mx-1">·</span>{' '}
                <span className="text-zinc-100">{age !== null ? age : 'Calculating...'}</span>
              </p>
              <p className="text-zinc-400">
                DOB (G) <span className="text-zinc-600 mx-1">·</span>{' '}
                <span className="text-zinc-100">08/30/1996</span>
              </p>
              <p className="text-zinc-400">
                Location <span className="text-zinc-600 mx-1">·</span>{' '}
                <span className="text-zinc-100">USA</span>
              </p>
              <p className="text-zinc-400">
                DOB (H) <span className="text-zinc-600 mx-1">·</span>{' '}
                <span className="text-zinc-100">{hijriDOB}</span>
              </p>
              <p className="text-zinc-400">
                Status <span className="text-zinc-600 mx-1">·</span>{' '}
                <span className="text-emerald-400 font-medium">Online</span>
              </p>
            </div>
          </div>
          <hr className="border-white/[0.08] my-3" />
          <div>
            <p className="text-xs font-medium text-zinc-400 mb-2.5">Select Datastream</p>
            <div className="space-y-1.5">
              {(Object.keys(ResumeCategory) as Array<keyof typeof ResumeCategory>).map((key) => {
                const label =
                  ResumeCategory[key].charAt(0).toUpperCase() +
                  ResumeCategory[key].slice(1).replace(/([A-Z])/g, ' $1');
                return (
                  <div
                    key={ResumeCategory[key]}
                    className="terminal-option cursor-pointer py-2 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/20 text-zinc-200 hover:text-white transition-all duration-150 flex items-center justify-between"
                    onClick={() => handleShowInfo(ResumeCategory[key])}
                  >
                    <span>{label} Experience</span>
                    <span className="text-zinc-500">›</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-1.5">
          {typedLines.map((line, index) => (
            <p
              key={index}
              className={
                line.startsWith('[Accessing')
                  ? 'text-zinc-400 text-xs mb-2 pb-1.5 border-b border-white/[0.08]'
                  : 'text-zinc-100 leading-relaxed'
              }
            >
              {line}
              {isTyping && index === typedLines.length - 1 && (
                <span className="inline-block w-2 h-4 bg-white blinking-cursor-anim ml-1.5 align-middle shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
              )}
            </p>
          ))}
          {!isTyping && (
            <div className="pt-3">
              <button
                type="button"
                className="terminal-option cursor-pointer bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.12] text-zinc-100 px-3.5 py-1.5 rounded-lg text-xs transition-colors"
                onClick={resetInfoView}
              >
                ‹ Back to Overview
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoWindowContent;
