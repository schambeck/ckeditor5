import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import {toWidget, toWidgetEditable} from '@ckeditor/ckeditor5-widget/src/utils';
import InsertArticleCommand from "./insert-article-command";

export default class ArticleEditing extends Plugin {

  static get requires() {
    return [Widget];
  }

  init() {
    console.log('ArticleEditing is being loaded');
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add('insertArticle', new InsertArticleCommand(this.editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('article', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block'
    });

    schema.register('articleTitle', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'article',

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: '$block'
    });

    schema.register('articleDescription', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'article',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root'
    });

    schema.addChildCheck( ( context, childDefinition ) => {
      if ( context.endsWith( 'articleDescription' ) && childDefinition.name === 'article' ) {
        return false;
      }
    } );
  }

  _defineConverters() {                                                      // MODIFIED
    const conversion = this.editor.conversion;

    // <article> converters
    conversion.for('upcast').elementToElement({
      model: 'article',
      view: {
        name: 'section',
        classes: 'article'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'article',
      view: {
        name: 'section',
        classes: 'article'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'article',
      view: (modelElement, viewWriter) => {
        const section = viewWriter.createContainerElement('section', {class: 'article'});

        return toWidget(section, viewWriter, {label: 'article widget'});
      }
    });

    // <articleTitle> converters
    conversion.for('upcast').elementToElement({
      model: 'articleTitle',
      view: {
        name: 'h1',
        classes: 'article-title'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'articleTitle',
      view: {
        name: 'h1',
        classes: 'article-title'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'articleTitle',
      view: (modelElement, viewWriter) => {
        // Note: You use a more specialized createEditableElement() method here.
        const h1 = viewWriter.createEditableElement('h1', {class: 'article-title'});

        return toWidgetEditable(h1, viewWriter);
      }
    });

    // <articleDescription> converters
    conversion.for('upcast').elementToElement({
      model: 'articleDescription',
      view: {
        name: 'div',
        classes: 'article-description'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'articleDescription',
      view: {
        name: 'div',
        classes: 'article-description'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'articleDescription',
      view: (modelElement, viewWriter) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement('div', {class: 'article-description'});

        return toWidgetEditable(div, viewWriter);
      }
    });
  }

}
