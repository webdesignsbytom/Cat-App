// src/analytics.ts
import ReactGA from 'react-ga';

const trackingId = 'UA-XXXXXXXXX-X'; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

export const trackPage = (page: string) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};
