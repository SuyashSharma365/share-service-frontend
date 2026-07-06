import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const ROOT_URL = 'https://dropcode.example.com';
const DEFAULT_IMAGE = `${ROOT_URL}/favicon.svg`;

function updateMeta(name: string, content: string) {
  let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }

  tag.content = content;
}

function updateProperty(property: string, content: string) {
  let tag = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }

  tag.content = content;
}

export default function Seo({ title, description, path = '/', image = DEFAULT_IMAGE }: SeoProps) {
  useEffect(() => {
    document.title = title;
    updateMeta('description', description);
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:url', `${ROOT_URL}${path}`);
    updateProperty('og:type', 'website');
    updateProperty('og:image', image);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = `${ROOT_URL}${path}`;
    }
  }, [title, description, path, image]);

  return null;
}
