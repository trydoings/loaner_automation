from tkinter import *
from tkinter import messagebox
import sys, os

# Import .env crednetials
from dotenv import load_dotenv
load_dotenv()


class loaner_automation:
    def __init__(self, master):
        self.master = master

        master.title("GitHub Loaner Registration")

        self.label_text = StringVar()
        self.label_text.set("\nPlease enter the details below so that we\n can provision a loaner laptop for you.\n")
        self.label = Label(master, textvariable=self.label_text)
        self.label.pack()

        self.label_name = Label(master, text = "Full Name")
        self.label_name.pack()
        self.enter_name = Entry(master)
        self.enter_name.pack()

        self.label_handle = Label(master, text = "GitHub Handle")
        self.label_handle.pack()
        self.enter_handle = Entry(master)
        self.enter_handle.pack()

        self.label_password = Label(master, text = "Select a password")
        self.label_password.pack()
        self.enter_password = Entry(master, show="*")
        self.enter_password_confirmation = Entry(master, show="*")
        self.enter_password.pack()

        self.submit_button = Button(master, text="Submit", command=self.submit)
        self.confirm_passwords_button = Button(master, text="Confirm passwords", command=self.confirm_passwords)
        self.continue_button = Button(master, text="Continue", command=self.submit_user_account)
        self.show_password_button = Button(master, text="Show password", command=self.show_passowrd)
        self.hide_password_button = Button(master, text="Hide password", command=self.hide_passowrd)
        self.exit_button = Button(master, text="Exit", command=self.exit)
        self.submit_button.pack()

    def show_passowrd(self):
        self.enter_password.config(show="")
    def hide_passowrd(self):
        self.enter_password.config(show="*")
    # Confirm passwords:
    def confirm_passwords(self):
        self.label_name.pack_forget()
        self.enter_name.pack_forget()
        self.label_handle.pack_forget()
        self.enter_handle.pack_forget()

        self.confirmed_password=self.enter_password_confirmation.get()
        print("confirmed password: ", self.confirmed_password)
        if self.confirmed_password:
            if self.confirmed_password == self.password:
                self.label_password.config(fg="green", text="Passwords match.")

                self.enter_password.pack_forget()
                self.enter_password_confirmation.pack_forget()
                self.confirm_passwords_button.pack_forget()
                self.show_password_button.pack_forget()

                self.label_text.set("Please click continue below to finish set-up.")
                self.continue_button.pack()
            else:
                messagebox.showwarning("Error", "Passwords don't match, try again")
                self.show_password_button.pack()
                self.enter_password_confirmation.delete(0,len(self.confirmed_password))
        else:
            err3="Error, passwords need to match, try again."
            print(err3)
            messagebox.showwarning('Error',err3)
            self.wasError = "true"
            self.label_password.config(fg="red", text="Passwords need to match, try again.")

    # Submit form
    def submit(self):
        self.wasError = "false"
        self.fullname=self.enter_name.get()

        if self.fullname:
            print("fullname: ", self.fullname)
            self.label_name.config(fg="black")
        else:
            err1="Error, needs a name"
            print(err1)
            messagebox.showwarning('Error',err1)
            self.wasError = "true"
            self.label_name.config(fg="red")
        self.handle=self.enter_handle.get()

        if self.handle:
            print("handle: ", self.handle)
            self.label_handle.config(fg="black")
        else:
            err2="Error, needs a handle"
            print(err2)
            messagebox.showwarning('Error',err2)
            self.wasError = "true"
            self.label_handle.config(fg="red")
        self.password=self.enter_password.get()

        if self.password:
            print("password: ", self.password)
            self.label_password.config(fg="black")
            if self.wasError == "false":
                self.submit_button.pack_forget()
                self.enter_password_confirmation.pack()
                self.confirm_passwords_button.pack()
        else:
            err3="Error, needs a password"
            print(err3)
            messagebox.showwarning('Error',err3)
            self.wasError = "true"
            self.label_password.config(fg="red")

    # Check if there were any errors
    def submit_user_account(self):
        if self.wasError == "false":
            self.enter_name.destroy()
            self.enter_handle.destroy()
            self.enter_password.destroy()
            self.enter_password_confirmation.destroy()
            self.label_password.destroy()
            self.continue_button.destroy()
            self.label_text.set("\nPlease confirm details on confirmation screen.")
            var = messagebox.askquestion('Compelete','Please review account details:\n\nFull name: '
            +self.fullname+'\nHandle: '+self.handle+'\nPassword: '+self.password+
            '\n\nContinue to loaner account creation?')
        if var == "yes":
            self.label_password.destroy()
            self.continue_button.destroy()
            self.label_text.set("\nSet-up finished. \nPlease exit this window\n then, logout of your machine\n and into your new account.")
            self.exit_button.pack()
            fullname_to_send=self.fullname.replace(" ", "")
            os.system('./test.sh '+fullname_to_send+' '+self.handle+' '+self.password+' '+os.getenv('oldpassword'))
        else:
            self.label.destroy()
            my_gui = loaner_automation(root)
            root.mainloop()

    def exit(self):
        root.destroy()


root = Tk()
my_gui = loaner_automation(root)
root.geometry("600x450") #Width x Height
root.mainloop()
