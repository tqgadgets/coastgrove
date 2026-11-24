import { useEffect } from 'react';

function setMetaContent(selector, createAttrs, content) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(createAttrs).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default function usePageMeta({ title, description, noindex = false }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMetaContent('meta[property="og:title"]', { property: 'og:title' }, title);
      setMetaContent('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
    }

    if (description) {
      setMetaContent('meta[name="description"]', { name: 'description' }, description);
      setMetaContent(
        'meta[property="og:description"]',
        { property: 'og:description' },
        description
      );
      setMetaContent(
        'meta[name="twitter:description"]',
        { name: 'twitter:description' },
        description
      );
    }

    const existingRobots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      setMetaContent('meta[name="robots"]', { name: 'robots' }, 'noindex');
    } else if (existingRobots) {
      existingRobots.remove();
    }
  }, [title, description, noindex]);
}
