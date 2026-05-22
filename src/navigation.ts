import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Book a Call', href: getPermalink('/booking') }],
};

export const footerData = {
  links: [
    {
      title: 'Quick Links',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Services', href: getPermalink('/services') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Book a Call', href: getPermalink('/booking') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/privacy-policy') },
        { text: 'Terms of Service', href: getPermalink('/terms') },
        { text: 'Disclaimer', href: getPermalink('/disclaimer') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `© <span id="footer-year">${new Date().getFullYear()}</span> [CLIENT NAME]. All rights reserved. · <a href="https://whitneybateson.com" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors duration-150">Site Design by WBDS</a>`,
};
