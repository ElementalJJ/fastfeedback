import { compareDesc, parseISO } from 'date-fns';
import firebase from './firebase-admin';

export async function getAllFeedback(siteId: string | string[] | undefined) {
  try {
    const snapshot = await firebase
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get();

    const feedback: any = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a: any, b: any) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );
    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  try {
    const snapshot = await firebase.collection('sites').get();
    const sites: any = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
}
