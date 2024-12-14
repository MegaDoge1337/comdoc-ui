import { Menubar } from 'primereact/menubar';

function Menu() {
    const items = [
        {
            label: 'Главная',
            icon: 'pi pi-list',
            url: '/'
        },
        {
            label: 'Сравнить документы',
            icon: 'pi pi-clone',
            url: '/compare'
        },
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}

export default Menu