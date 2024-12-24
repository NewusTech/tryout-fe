// "use client";

// import { Label } from '@/components/ui/label';
// import dynamic from 'next/dynamic';
// import { useState, useEffect } from 'react';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// import 'katex/dist/katex.min.css';
// import katex from 'katex';

// const EditorPage = () => {
//     const [editorValue, setEditorValue] = useState('');

//     const handleChange = (value: string) => {
//         setEditorValue(value);
//     };

//     const modules = {
//         toolbar: [
//             [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//             [{ 'align': [] }],
//             ['bold', 'italic', 'underline'],
//             [{ 'script': 'sub' }, { 'script': 'super' }],
//             ['link', 'image'],
//             ['formula'] // Menambahkan tombol untuk formula
//         ]
//     };

//     // Fungsi untuk merender rumus LaTeX
//     const renderMath = () => {
//         const elements = document.querySelectorAll('.ql-editor');
//         elements.forEach((el) => {
//             const latexText = el.innerHTML.match(/\$\$[^$]+\$\$/g);
//             if (latexText) {
//                 latexText.forEach((latex) => {
//                     try {
//                         const view = katex.renderToString(latex.replace('$$', '').replace('$$', ''));
//                         el.innerHTML = el.innerHTML.replace(latex, `<span class="katex">${view}</span>`);
//                     } catch (e) {
//                         console.error('Error rendering LaTeX:', e);
//                     }
//                 });
//             }
//         });
//     };

//     useEffect(() => {
//         renderMath();
//     }, [editorValue]);

//     return (
//         <div>
//             <div>
//                 <Label className="text-primary">Editor</Label>
//                 <ReactQuill
//                     value={editorValue}
//                     onChange={handleChange}
//                     className=" mt-2"
//                     modules={modules}
//                 />
//             </div>
//         </div>
//     );
// };

// export default EditorPage;

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
