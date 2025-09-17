using FluentValidation;
using Ordering.Application.Commands;

namespace Ordering.Application.Validators
{
    public class CheckoutOrderCommandValidator : AbstractValidator<CheckoutOrderCommand>
    {
        public CheckoutOrderCommandValidator()
        {
            RuleFor(e => e.UserName)
                .NotEmpty()
                .WithMessage("{UserName} is required.")
                .NotNull()
                .MaximumLength(70)
                .WithMessage("{UserName} must not exceed 70 characters.");

            RuleFor(f => f.TotalPrice)
                .NotEmpty()
                .WithMessage("{TotalPrice} is required.")
                .GreaterThan(-1)
                .WithMessage("{TotalPrice} should not be -ve.");

            RuleFor(g => g.EmailAddress)
                .NotEmpty()
                .WithMessage("{EmailAddress} is required.");

            RuleFor(h => h.FirstName)
                .NotEmpty()
                .NotNull()
                .WithMessage("{FirstName} is required.");

            RuleFor(i => i.LastName)
                .NotEmpty()
                .NotNull()
                .WithMessage("{LastName} is required.");
        }
    }
}
