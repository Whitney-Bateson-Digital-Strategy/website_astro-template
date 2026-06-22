import { config, collection, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'WBDS Blog' },
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishDate: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          description: 'Short summary shown in blog listings and meta description.',
          multiline: true,
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.fields.value.value || 'Tag',
          }
        ),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Draft posts are not published to the site.',
          defaultValue: true,
        }),
        content: fields.mdx({
          label: 'Content',
          components: {
            LeadMagnetCTA: block({
              label: 'Lead Magnet CTA',
              schema: {
                heading: fields.text({ label: 'Heading' }),
                description: fields.text({
                  label: 'Description',
                  multiline: true,
                }),
                ctaLabel: fields.text({ label: 'Button Label' }),
                ctaHref: fields.text({ label: 'Button URL' }),
              },
            }),
          },
        }),
      },
    }),
  },
});
