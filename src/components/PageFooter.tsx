interface PageFooterProps {
  stack?: string;
}

const PageFooter = ({
  stack = 'React, shadcn/ui and n8n, self-hosted.',
}: PageFooterProps) => (
  <footer className="flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
    <span>Built by Hamza Eshoul. {stack}</span>
    <a
      className="underline-offset-4 hover:underline"
      href="https://github.com/hamza-eshoul/demos"
    >
      Source on GitHub
    </a>
  </footer>
);

export default PageFooter;
