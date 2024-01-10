export const arrayItems = [
  createCopywritingItem("IDCA", "Identify, Describe, Convince, Action"),
  createCopywritingItem("CUBA", "Curiosity, Uniqueness, Believability, Action"),
  createCopywritingItem("HOOK", "Highlight, Offer, Overcome, Keep"),
  createCopywritingItem("CAP", "Curiosity, Action, Persuasion"),
  createCopywritingItem("PPT", "Picture, Promise, Testimonials"),
  createCopywritingItem("APP", "Audience, Promise, Proof"),
  createCopywritingItem("RISE", "Relate, Intrigue, Solve, Encourage"),
  createCopywritingItem("FAPC", "Feature, Advantage, Proofs, Close"),
  createCopywritingItem("MUSE", "Motivation, Understand, Stimulate"),
  createCopywritingItem("PAS", "Problem, Agitate, Solution"),
];

function createCopywritingItem(id, description) {
  return {
    name: id,
    id,
    description,
    awal: `Buatkan copywriting pola sesuai ${description} setiap penjelasan berisi 1 kalimat pada :`,
    option: getDefaultOption(),
    kategori: "copywriting",
  };
}

function getDefaultOption() {
  return {
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  };
}
