export function useRegisterRules(formData: any) {
  const rules: any = {
    username: [
      {
        required: true,
        message: "Username is required",
        trigger: "blur"
      },
      {
        min: 4,
        message: "Username length should be at least 5 characters",
        trigger: "blur"
      }
    ],
    email: [
      {
        required: true,
        message: "Email is required",
        trigger: "blur"
      },
      {
        min: 4,
        message: "Username length should be at least 5 characters",
        trigger: "blur"
      }
    ],
    password: [
      {
        required: true,
        message: "Password is required",
        trigger: "blur"
      },
      {
        min: 4,
        message: "Password length should be at least 5 characters",
        trigger: "blur"
      }
    ],
    confirm: [
      {
        validator: (rule: any, value: string, callback: Function) => {
          if (value != formData.password) {
            callback(new Error("Confirm not match"));
          }
        },
        trigger: "blur"
      }
    ]
  };
  return rules;
}

export function useLoginRules(formData: any) {
  const rules: any = {
    email: [
      {
        required: true,
        message: "Email is required",
        trigger: "blur"
      },
      {
        min: 4,
        message: "Username length should be at least 5 characters",
        trigger: "blur"
      }
    ],
    password: [
      {
        required: true,
        message: "Password is required",
        trigger: "blur"
      },
      {
        min: 4,
        message: "Password length should be at least 5 characters",
        trigger: "blur"
      }
    ]
  };
  return rules;
}
