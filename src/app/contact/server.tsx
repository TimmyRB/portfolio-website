"use server";

export async function sendEmail(formData: FormData) {
  const { name, email, message } = Object.fromEntries(formData);
}
