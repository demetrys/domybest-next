import dynamic from 'next/dynamic';

const DynamicAnnotation = dynamic(() => import('./AnnotationWrapper'), {
  ssr: false
});

export default DynamicAnnotation;
