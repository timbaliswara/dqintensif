declare module "sanitize-html" {
  type TransformTags = Record<
    string,
    (
      tagName: string,
      attribs: Record<string, string | undefined>,
    ) => { tagName: string; attribs?: Record<string, string | undefined> }
  >;

  type IOptions = {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    allowedSchemes?: string[];
    transformTags?: TransformTags;
  };

  export default function sanitizeHtml(dirty: string, options?: IOptions): string;
}

