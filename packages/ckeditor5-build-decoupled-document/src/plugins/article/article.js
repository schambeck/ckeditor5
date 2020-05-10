import ArticleEditing from './article-editing';
import ArticleUi from './article-ui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Article extends Plugin {

  static get pluginName() {
    return 'Article';
  }

  constructor(editor) {
    super(editor);
  }

  static get requires() {
    return [ArticleEditing, ArticleUi];
  }

}
