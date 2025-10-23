interface ContentSectionProps {
  title: string;
  subtitle: string;
  description: string;
  maxWidth?: string;
  className?: string;
}

export default function ContentSection({ 
  title, 
  subtitle, 
  description, 
  maxWidth = "1733px",
  className = ""
}: ContentSectionProps) {
  return (
    <section className={`bg-newsprint py-8 md:py-16 ${className}`}>
      <div className="px-4 md:px-[25px]">
        <h2 
          className="text-charcoal font-bold leading-tight mb-2"
          style={{ 
            fontFamily: 'var(--font-helvetica)', 
            fontSize: 'clamp(24px, 2.5vw, 47px)' 
          }}
        >
          {title}
        </h2>
        <p 
          className="text-charcoal italic leading-tight mb-4"
          style={{ 
            fontFamily: 'var(--font-times)', 
            fontSize: 'clamp(24px, 2.5vw, 47px)' 
          }}
        >
          {subtitle}
        </p>
        <p 
          className="text-charcoal italic leading-relaxed"
          style={{ 
            fontFamily: 'var(--font-times)', 
            fontSize: 'clamp(14px, 1vw, 18px)',
            maxWidth 
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}

