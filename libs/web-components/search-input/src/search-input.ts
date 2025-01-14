import { customElement, property } from 'lit/decorators.js';
import { html, TemplateResult } from 'lit';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';
import { classMap } from 'lit/directives/class-map.js';

import '@material/mwc-icon-button';
import '@material/mwc-circular-progress';

import { styles } from './styles.css';

/**
 * The `Search Input` component
 */
@customElement('fds-search-input')
export class SearchInput extends TextFieldBase {
  static styles = styles;

  @property({ type: String }) icon = 'search';
  @property({ type: Boolean }) showClearButton = true;
  @property({ type: Boolean }) loading = false;

  protected renderClearButton(): TemplateResult | string {
    const clearButtonclasses = {
      'fds-search-input-clear-button--show': !!this.value,
      'fds-search-input-clear-button--hide': !this.value
    };
    return this.showClearButton
      ? html`<mwc-icon-button
          @click=${this.clear}
          class="mdc-text-field__affix--suffix fds-search-input-clear-button ${classMap(clearButtonclasses)}"
          icon="clear"
        ></mwc-icon-button>`
      : ``;
  }

  protected renderLoadingButton() : TemplateResult {
    return html`<mwc-circular-progress indeterminate density="-6" class="mdc-text-field__affix--suffix" ></mwc-circular-progress>`
  }

  protected renderTrailingIcon(): TemplateResult | string {
    return this.loading ? this.renderLoadingButton() : this.renderClearButton()
  }

  private clear() {
    this.value = '';
    const inputEvent = new CustomEvent('input');
    this.dispatchEvent(inputEvent);
    this.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-search-input': SearchInput;
  }
}
