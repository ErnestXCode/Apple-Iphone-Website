import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './input.css'

import App from './App.jsx'

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://aa9ec27003af445b4863b46757ac837f@o4508546220818432.ingest.us.sentry.io/4508575302025216",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.metrics.metricsAggregatorIntegration(), 
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
    }),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
