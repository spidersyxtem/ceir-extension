import React from 'react';
import ReactDOM from 'react-dom/client';
import CeirApp from './CeirApp';

// မူရင်း Function ကိုလည်း Extension Component တွေ Error မတက်အောင် ဒီအတိုင်း ထားပေးထားပါတယ်
export function renderCeirApp(container: HTMLElement) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <CeirApp />
    </React.StrictMode>
  );
  return {
    unmount: () => root.unmount()
  };
}

// 🎯 ဝဘ်ဆိုက် (Web App) ပေါ်တွင် တိုက်ရိုက်ပွင့်လာစေရန် အော်တို Render လုပ်ခိုင်းခြင်း
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <CeirApp />
    </React.StrictMode>
  );
}
