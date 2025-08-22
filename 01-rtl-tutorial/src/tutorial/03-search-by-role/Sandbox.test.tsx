import { render, screen, logRoles } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("03-search-by-role", () => {
  test("renders nav and navigation links", () => {
    const { container } = render(<Sandbox />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    // getByRole throws an error if there are multiple elements with the same role
    // two options:provide name or getAllByRole (returns a list)

    logRoles(container);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  test("renders headings with correct hierarchy", () => {
    render(<Sandbox />);
    expect(screen.getByRole("heading", { name: "Main Heading", level: 1 }));
    expect(screen.getByRole("heading", { name: "SubHeading", level: 2 }));
  });

  test("renders image with alt text", () => {
    render(<Sandbox />);
    expect(screen.getByRole("img", { name: "Example" })).toBeInTheDocument();
  });

  test("renders initial buttons", () => {
    render(<Sandbox />);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "click Cancel" })
    ).toBeInTheDocument();
  });

  test("error button is not initially visible", () => {
    render(<Sandbox />);

    expect(
      screen.queryByRole("button", { name: "Error" })
    ).not.toBeInTheDocument();
  });

  test("async button appears after delay", async () => {
    render(<Sandbox />);
    
    expect(
      screen.queryByRole("button", { name: /async button/i })
    ).not.toBeInTheDocument();

    
    const asyncButton = await screen.findByRole("button", {
      name: /async button/i,
    });
    expect(asyncButton).toBeInTheDocument();
  });

  // END
});
