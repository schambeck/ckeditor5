// This SVG file import will be handled by webpack's raw-text loader.
// This means that imageIcon will hold the source SVG.
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class InsertImage extends Plugin {

  static get pluginName() {
    return 'InsertImage';
  }

  constructor(editor) {
    super(editor);
  }

  init() {
    console.log('InsertImage is being loaded');
    const editor = this.editor;

    editor.ui.componentFactory.add('insertImage', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert image',
        icon: imageIcon,
        tooltip: true
      });

      // Callback executed once the image is clicked.
      view.on('execute', () => {
        const imageUrl = prompt('Image URL');

        editor.model.change(writer => {
          const imageElement = writer.createElement('image', {
            src: imageUrl
          });

          // Insert the image in the current selection location.
          editor.model.insertContent(imageElement, editor.model.document.selection);
        });
      });

      return view;
    });
  }
}
