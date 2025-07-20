import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Priyam Bansal - Product Manager Portfolio',
  description = 'Product Manager driving innovation through data-driven solutions and strategic problem-solving. Specializing in API integration, product lifecycle management, and data analysis.',
  keywords = 'Product Manager, API Integration, Data Analysis, ICICI Bank, IIT Roorkee, Python, SQL, Strategic Problem Solving',
  image = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  url = 'https://priyambansal.dev'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Priyam Bansal" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Priyam Bansal Portfolio" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Priyam Bansal",
          "jobTitle": "Product Manager",
          "worksFor": {
            "@type": "Organization",
            "name": "ICICI Bank"
          },
          "alumniOf": {
            "@type": "Organization",
            "name": "IIT Roorkee"
          },
          "url": url,
          "sameAs": [
            "https://www.linkedin.com/in/priyambansal/",
            "mailto:priyam_b@ch.iitr.ac.in"
          ],
          "knowsAbout": [
            "Product Management",
            "API Integration",
            "Data Analysis",
            "Python",
            "SQL",
            "Strategic Problem Solving"
          ]
        })}
      </script>
    </Helmet>
  );
};