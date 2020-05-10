import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertArticleCommand extends Command {

  execute() {
    this.editor.model.change(writer => {
      // Insert <article>*</article> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createArticle(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'article');

    this.isEnabled = allowedIn !== null;
  }
}

function createArticle(writer) {
  const article = writer.createElement('article');
  const articleTitle = writer.createElement('articleTitle');
  const articleDescription = writer.createElement('articleDescription');

  writer.append(articleTitle, article);
  writer.append(articleDescription, article);

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement('paragraph', articleDescription);

  return article;

}
