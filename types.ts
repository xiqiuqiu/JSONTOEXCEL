// A generic object structure for a single item in the JSON data.
export type JsonDataObject = { [key: string]: any };

// An array of JSON data objects, which represents the entire JSON file.
export type JsonData = JsonDataObject[];

// Declaration for the SheetJS 'xlsx' library loaded from a CDN.
// This informs TypeScript about the global XLSX object.
// FIX: Use `declare global` to make the XLSX type available across all modules,
// as `declare const` within a module is only locally scoped.
declare global {
  const XLSX: any;
}
