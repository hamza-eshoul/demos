import {
  DEMO_VIDEO_POSTER,
  DEMO_VIDEO_SRC,
} from '@/features/orders-duplicates/constants/ordersDemo.constants';

const DemoVideo = () => (
  <figure className="flex flex-col gap-2">
    <div className="overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 shadow-sm">
      <video
        className="aspect-[8/5] w-full"
        src={DEMO_VIDEO_SRC}
        poster={DEMO_VIDEO_POSTER}
        autoPlay
        loop
        muted
        playsInline
        controls
      />
    </div>
    <figcaption className="text-xs text-muted-foreground">
      70-second walkthrough, recorded on this live page and my n8n.
    </figcaption>
  </figure>
);

export default DemoVideo;
