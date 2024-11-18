import { useEffect } from 'react';

function usePageTitle(title: string | undefined) {
  useEffect(() => {
    if (!title) return;
    document.title = `${title} - Filmvisarna`;
  }, [title]);
}

export default usePageTitle;
