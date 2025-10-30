const BASE_SEARCH_URL = 'https://openlibrary.org/search.json?title=';

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

export const fetchBooks = async (title) => {
  const data = await fetchJson(`${BASE_SEARCH_URL}${encodeURIComponent(title)}`);
  return data.docs || [];
};

// Work details: pass work key like "/works/OL123W"
export const fetchWorkDetails = async (workKey) => {
  if (!workKey) throw new Error('workKey is required');
  return fetchJson(`https://openlibrary.org${workKey}.json`);
};

// Edition details by OLID (e.g., OL123M)
export const fetchEditionDetails = async (olid) => {
  if (!olid) throw new Error('olid is required');
  return fetchJson(`https://openlibrary.org/books/${encodeURIComponent(olid)}.json`);
};

// Brief availability: tries to return IA/preview links for an edition
export const fetchReadAvailability = async (olid) => {
  if (!olid) throw new Error('olid is required');
  const key = `OLID:${encodeURIComponent(olid)}`;
  const data = await fetchJson(`https://openlibrary.org/api/volumes/brief/json/${key}`);
  return data[key] || null;
};

// Utility: build cover image URL by cover id and size (S, M, L)
export const buildCoverUrl = (coverId, size = 'M') => {
  if (!coverId) return 'https://via.placeholder.com/150x220?text=No+Cover';
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

// Pure helper: derive read info from a search doc without extra fetches
export const buildReadInfoFromDoc = (doc) => {
  const workUrl = doc?.key ? `https://openlibrary.org${doc.key}` : undefined;
  const olid = Array.isArray(doc?.edition_key) && doc.edition_key.length > 0 ? doc.edition_key[0] : undefined;
  const iaId = Array.isArray(doc?.ia) && doc.ia.length > 0 ? doc.ia[0] : undefined;
  const hasFullText = Boolean(doc?.has_fulltext);

  const readUrl = iaId
    ? `https://archive.org/details/${iaId}?view=theater`
    : (olid ? `https://openlibrary.org/books/${olid}` : workUrl);

  const canRead = Boolean(iaId || hasFullText || olid);

  return { readUrl, canRead, workUrl };
};
