import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, fireEvent, getByTestId} from "@testing-library/react";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Homepage Loads in Correctly.", () => {
  const { container } = render(<App />);
  const homepageTitle = getByTestId(container, "homepageTitle");
  expect(homepageTitle.textContent).toBe("MEET");
});

it("Spotify Player is Found", () => {
  const { container } = render(<App />);
  const homepageTitle = getByTestId(container, "homepageTitle");
  expect(homepageTitle.textContent).toBe("MEET");
});