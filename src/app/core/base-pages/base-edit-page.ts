import { ITouchable } from '../interfaces/touchable';
import { BasePage } from './base-page';

export abstract class BaseEditPage extends BasePage implements ITouchable {
  abstract get isTouched(): boolean;

  /*
   * @Description:
   *    The text message for DiscardChanges modal window
   *    null - is default DiscardChangesFn message;
   *    override it for specifying the message;
   */
  get discardChangesMessage(): string{
    return null;
  }

  protected abstract save(): void;
  public cancel(): void {
    this.goBack();
  }
}
