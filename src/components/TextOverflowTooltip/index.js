import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { debounce } from '../../utils';

class TextOverflowTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false
    };
  }

  reCalc() {
    window.addEventListener(
      'resize',
      debounce(() => {
        if (this.comp) {
          if (
            this.comp.offsetWidth === this.comp.scrollWidth &&
            this.comp.offsetWidth !== 0
          ) {
            this.comp.style.width = this.comp.offsetWidth + 2 + 'px';
            this.setState({
              showTooltip: false
            });
          } else if (
            this.comp.offsetWidth < this.comp.scrollWidth &&
            !this.state.showTooltip
          ) {
            this.setState({
              showTooltip: true
            });
          }
        }
      }, 500)
    );
  }

  componentDidMount() {
    if (
      this.comp.offsetWidth === this.comp.scrollWidth &&
      this.comp.offsetWidth !== 0
    ) {
      this.comp.style.width = this.comp.offsetWidth + 2 + 'px';
    } else if (
      this.comp.offsetWidth < this.comp.scrollWidth &&
      !this.state.showTooltip
    ) {
      this.setState({
        showTooltip: true
      });
    }
    this.reCalc();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.recalc);
  }

  render() {
    const { maxWidth, className, popoverPlacement, style } = this.props;
    const computedStyle = Object.assign({}, style, {
      maxWidth
    });
    const val = (
      <div
        style={computedStyle}
        className={className}
        ref={val => (this.comp = val)}
      >
        {this.props.children}
      </div>
    );
    return this.state.showTooltip ? (
      <OverlayTrigger
        placement={popoverPlacement}
        overlay={<Tooltip className="tooltip">{this.props.children}</Tooltip>}
      >
        {val}
      </OverlayTrigger>
    ) : (
      val
    );
  }
}

export default TextOverflowTooltip;
