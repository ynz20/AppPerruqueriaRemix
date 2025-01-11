import { User } from "~/types/interfaces";

export function userFormValidator(user: User){
    const errors: Record<string, string> = {};
    if (!user.name || user.name.trim().length < 3) {
      errors.name = "El nom ha de tenir almenys 3 caràcters.";
    }
    if (!user.nick || user.nick.trim().length < 3) {
      errors.nick = "El nom d'usuari ha de tenir almenys 3 caràcters.";
    }
    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "El correu no és vàlid.";
    }
    if (!user.telf || !/^\d{9,15}$/.test(user.telf)) {
      errors.telf = "El telèfon ha de ser un número vàlid entre 9 i 15 dígits.";
    }
    if (!user.password || user.password.length < 6 || user.password.length > 20) {
      errors.password = "La contrasenya ha de tenir entre 6 i 20 caràcters.";
    } else if (!/[A-Z]/.test(user.password)) {
      errors.password = "La contrasenya ha de contenir almenys una lletra majúscula.";
    } else if (!/[a-z]/.test(user.password)) {
      errors.password = "La contrasenya ha de contenir almenys una lletra minúscula.";
    } else if (!/[0-9]/.test(user.password)) {
      errors.password = "La contrasenya ha de contenir almenys un número.";
    } else if (!/[\W_]/.test(user.password)) {
      errors.password = "La contrasenya ha de contenir almenys un caràcter especial.";
    }
    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }