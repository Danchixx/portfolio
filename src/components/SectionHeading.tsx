interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-surface-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-surface-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-12 bg-accent-500 rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  )
}
