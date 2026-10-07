import { API_URL, TIMEOUT_MS } from './config';
import { OFFLINE_SCHOLARSHIPS } from './scholarshipData';

async function request(path, options = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(API_URL + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      signal: ctrl.signal,
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(typeof body.detail === 'string' ? body.detail : 'Request failed');
      err.status = res.status;
      throw err;
    }
    return body;
  } finally {
    clearTimeout(timer);
  }
}

// Offers: from the server, or the built-in copy if the server is unreachable.
export async function getScholarships() {
  try {
    return { items: await request('/scholarships'), online: true };
  } catch (e) {
    return { items: OFFLINE_SCHOLARSHIPS, online: false };
  }
}

// Submit an application. Offline, it is kept on the phone as a local pending application.
export async function submitApplication(scholarship, fullName, email) {
  try {
    const a = await request('/applications', {
      method: 'POST',
      body: JSON.stringify({ scholarship_id: scholarship.id, full_name: fullName, email }),
    });
    return { id: a.id, status: a.status, online: true };
  } catch (e) {
    if (e.status) throw e; // the server answered with a real error (e.g. 409 full): show it
    return { id: null, status: 'pending', online: false, submittedAt: Date.now() };
  }
}

// Check the decision. Offline demo rule: accepted 20 seconds after submitting.
export async function getApplicationStatus(applicationId, submittedAt) {
  if (applicationId) {
    try {
      const a = await request('/applications/' + applicationId);
      return { status: a.status, online: true };
    } catch (e) {
      /* fall through to the offline rule */
    }
  }
  const waited = Date.now() - (submittedAt || 0);
  return { status: waited >= 20000 ? 'accepted' : 'pending', online: false };
}
