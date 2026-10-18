import { Badge } from '@/components/ui/badge';
import { EMAIL_STATUS_LABEL } from '../../constants/statusStyles.constants';
import { DateFormatUtils } from '../../utils/DateFormatUtils';
import type { EmailEntry } from '../../types/booking.types';

interface EmailPreviewCardProps {
  email: EmailEntry;
}

const EmailPreviewCard = ({ email }: EmailPreviewCardProps) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
    <header className="flex flex-col gap-1 border-b px-5 py-4 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium">{email.subject}</span>
        <Badge variant="outline">{EMAIL_STATUS_LABEL[email.status]}</Badge>
      </div>
      <span className="text-muted-foreground">
        To {email.to}, {DateFormatUtils.long(email.createdAt)}
      </span>
    </header>
    <iframe
      title={email.subject}
      sandbox=""
      srcDoc={email.html}
      className="h-[420px] w-full bg-white"
    />
  </article>
);

export default EmailPreviewCard;
