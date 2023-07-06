export const GA_TRACKING_ID: string = "G-99QL5K6V63";

export const pageview = (url: string): void => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};


export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: string;
}): void => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
