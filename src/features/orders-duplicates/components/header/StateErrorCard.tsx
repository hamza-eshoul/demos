import { CircleAlert } from 'lucide-react';

const StateErrorCard = () => (
  <div className="flex items-center gap-3 rounded-lg border border-risk/30 bg-risk/5 p-4 text-sm">
    <CircleAlert className="size-4 text-risk" />
    The demo server isn't answering right now. Please try again in a minute.
  </div>
);

export default StateErrorCard;
