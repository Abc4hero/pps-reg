package z2432k.memology.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/*import jakarta.validation.Valid;
import z2432k.memology.model.AlienUser;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
*/

@Controller
public class RegistrationController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/register")
    public String showRegistrationForm() {
        return "register"; // Переход на register.html
    }

    @GetMapping("/result")
    public String showResultPage() {
        return "result"; // Переход на result.html
    }
    @GetMapping("/testing")
    public String showTestPage() {
        return "testing"; // Переход на result.html
    }
/*
    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("alienUser", new AlienUser());
        return "register";
    }
    @PostMapping("/register")
    public String processRegistration(@Valid @ModelAttribute AlienUser alienUser,
                                      BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "register";
        }

        model.addAttribute("alienUser", alienUser);
        return "result";
    }
*/
}