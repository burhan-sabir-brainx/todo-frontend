function HeaderLogo() {
    return (
        <div>
            Todo App
        </div>
    );
}

function HeaderButton({ buttonText }) {
    return (
        <button className="header-button">
            {buttonText}
        </button>
    );
}

export default function Header() {
    return (
        <div className="header-container">
            <HeaderLogo />
            <div className="header-button-container">
                <HeaderButton buttonText="Add Todo" />
                <HeaderButton buttonText="View Todos" />
                <HeaderButton buttonText="Delete Todo" />
            </div>
        </div >
    );
}
