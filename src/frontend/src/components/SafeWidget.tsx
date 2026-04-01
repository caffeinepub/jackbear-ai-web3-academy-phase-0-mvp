import { Component, type ReactNode } from "react";

/**
 * SafeWidget — minimal error boundary that renders null on any child error.
 * Use this to wrap optional enhancement widgets so they can never block
 * core surfaces from rendering.
 */
export class SafeWidget extends Component<
  { children: ReactNode },
  { err: boolean }
> {
  state = { err: false };

  static getDerivedStateFromError() {
    return { err: true };
  }

  render() {
    return this.state.err ? null : this.props.children;
  }
}
