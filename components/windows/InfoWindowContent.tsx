
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
    <div ref={contentRef} className="h-full terminal-style p-4 overflow-y-auto font-['Share_Tech_Mono'] text-[#00ff41] bg-[#0d0d0d]">
      {!selectedCategory ? (
        <>
          <div className="mb-4">
            <div className="flex gap-4 items-center mb-4">
              <Avatar src="https://i.imgur.com/v8iI51q.jpeg" alt="Profile Picture" />
              <div>
                <h3 className="font-['Cairo'] text-lg sm:text-xl text-white">داود بن داود الجهاد عبدالله</h3>
                <h4 className="font-['Orbitron'] text-base sm:text-lg">Dawud Bin Dawud Al Jihad Abduallah</h4>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 text-sm">
              <p>AGE: <span className="text-white">{age !== null ? age : 'Calculating...'}</span></p>
              <p>DOB (G): <span className="text-white">08/30/1996</span></p>
              <p>LOCATION: <span className="text-white">USA</span></p>
              <p>DOB (H): <span className="text-white">{hijriDOB}</span></p>
              <p>STATUS: <span className="text-green-400">ONLINE</span></p>
            </div>
          </div>
          <hr className="border-green-400/20 my-2" />
          <div>
            <p className="text-amber-400">[SELECT DATASTREAM]</p>
            {(Object.keys(ResumeCategory) as Array<keyof typeof ResumeCategory>).map(key => (
              <p
                key={ResumeCategory[key]}
                className="terminal-option cursor-pointer hover:text-[#0d0d0d] hover:bg-[#00ff41]"
                onClick={() => handleShowInfo(ResumeCategory[key])}
              >
                [&gt; {ResumeCategory[key].charAt(0).toUpperCase() + ResumeCategory[key].slice(1).replace(/([A-Z])/g, ' $1')} Experience]
              </p>
            ))}
          </div>
        </>
      ) : (
        <div>
          {typedLines.map((line, index) => (
            <p key={index} className={line.startsWith("[Accessing") ? "text-amber-400" : ""}>
              {line}
              {isTyping && index === typedLines.length - 1 && <span className="inline-block w-2.5 h-5 bg-[#00ff41] blinking-cursor-anim ml-1"></span>}
            </p>
          ))}
          {!isTyping && (
            <>
              <br />
              <p
                className="terminal-option cursor-pointer hover:text-[#0d0d0d] hover:bg-[#00ff41]"
                onClick={resetInfoView}
              >
                [&lt; Back]
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoWindowContent;
