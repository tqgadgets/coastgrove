import { ArrowLeft } from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import { FadeUp } from '../components/ui/motion/reveals.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { seo } from '../data/site.js';
import './Pages.css';

export default function NotFoundPage() {
  usePageMeta(seo.notFound);

  return (
    <section>
      <div className="container">
        <div className="not-found">
          <FadeUp>
            <div className="not-found__message">
              <Badge>404</Badge>
              <h1>Page Not Found</h1>
              <p className="not-found__desc">
                We could not find the page you were looking for. Head back to the home
                page to explore our landscaping services and recent Orange County work.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Button variant="primary" to="/">
              <ArrowLeft size={18} strokeWidth={2} aria-hidden="true" />
              Back to Home
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
