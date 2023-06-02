import { render, screen } from "@testing-library/react";
import NoteList from "./NoteList";
import { Action } from "../reducer/ratesReducer";

describe("NoteList component", () => {
  it("should render NoteList component correctly", () => {
    render(<NoteList rates={[]} handleEdit={function (id: number): void {
      throw new Error("Function not implemented.");
    } } dispatch={function (value: Action): void {
      throw new Error("Function not implemented.");
    } } />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });
});