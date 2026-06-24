'use client';

import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-notion-x/src/styles.css';

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(m => m.Collection)
);

export default function ProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [recordMap, setRecordMap] = useState<any>(null);

  useEffect(() => {
    Promise.resolve(params).then(({ id }) => {
      fetch(`/api/notion/${id}`)
        .then(res => res.json())
        .then(data => setRecordMap(data));
    });
  }, []);

  if (!recordMap) return <div>로딩 중...</div>;

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      components={{ Collection }}
      mapPageUrl={(pageId) => {
        const clean = pageId.replace(/-/g, '');
        if (clean === 'bfcf4bab8a5f4b00ac77a88e6b6c35a9') return '/';
        return `/projects/${clean}`;
      }}
    />
  );
}