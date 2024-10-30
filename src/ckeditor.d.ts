declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import { ComponentType } from 'react';

  export const CKEditor: ComponentType<{
    editor: typeof ClassicEditor;
    data?: string;
    onChange?: (event: Event, editor: ClassicEditor) => void;
    onReady?: (editor: ClassicEditor) => void;
    onBlur?: (event: Event, editor: ClassicEditor) => void;
    onFocus?: (event: Event, editor: ClassicEditor) => void;
  }>;
}
