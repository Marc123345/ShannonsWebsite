import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  intensity?: number;
  className?: string;
}

export function GlitchText({ text, intensity = 5, className = '' }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text);

  useEffect(() => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    let interval: NodeJS.Timeout;

    const glitch = () => {
      if (Math.random() > 0.95) {
        const glitched = text
          .split('')
          .map((char) => {
            if (Math.random() < intensity / 100) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          })
          .join('');

        setGlitchText(glitched);

        setTimeout(() => {
          setGlitchText(text);
        }, 50 + Math.random() * 100);
      }
    };

    interval = setInterval(glitch, 100);

    return () => clearInterval(interval);
  }, [text, intensity]);

  return <span className={className}>{glitchText}</span>;
}
