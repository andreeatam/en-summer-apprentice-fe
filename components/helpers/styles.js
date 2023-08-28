const bookOfStyles={
    purchase: [
        'bg-white',
        'px-4',
        'py-3',
        'sm:border-b',
        'sm:border-gray-200',
        'flex-1',
        'grid',
        'grid-cols-1',
        'gap-1',
   
        
    ],


    purchaseTitle: ['text-lg','font-medium','text-gray-900','flex-1'],

    purchaseQuantity: ['w-[50px]',
        'text-center',
        'py-1',
        'px-2',
        'border',
        'border-orange-700',
        'brder-2',
        'disabled:border-0',
        'rounded',
        'text-orange-700',
        'text-sm',
        'leading-tight',
        'font-bold',
        'disabled:text-gray-700',
        'focus:outline-none',
        'focus:shadow-outline',
        'flex-1'
    ],

    purchaseTypeWrapper: ['flex-1','flex-row','justify-end','flex-1'],
    purchaseDate: ['text-center','flex-1','hidden','md:flex'],
    purchasePrice: ['text-center','w-12','hidden','md:flex'],
    actions: ['sm:mt-0','sm:text-right','w-28', 'text-center'],
    actionButton: [
        'ml-2',
        'text-xl',
        'ps-2',
        'font-medium',
        'underline',
        'text-gray-700',
        'flex-1',
    ],

    deleteButton: ['hover:text-red-500'],
    cancelButton: ['hover:text-red-500'],
    saveButton: ['hover:text-red-500'],
    editButton: ['hover:text-red-500'],
    hiddenButton: ['hidden'],

    eventWrapper: [
        'event',
        'bg-white',
        'rounded'
    ],

    actionsWrapper: ['actions','flex','items-center','mt-4', 'text-center'],

    quantity: ['actions','flex','items-center','mt-4',],

    input: [
        'input',
        'w-16',
        'text-center',
        'border',
        'border-gray-300',
        'rounded',
        'py-2',
        'px-3',
        'text-gray-700',
        'focus:outline-none',
        'focus:shadow-outline'
    ],

    quantityActions: ['quantity-actions','flex','space-x-2','ml-6'],

    purchaseQuantityWrapper: ['flex-1', 'flex-row', 'justify-end', 'flex-1'],

    increaseButton: [
        'increase',
        'px-3',
        'py-1',
        'rounded',
        'add-btn',
        'text-white',
        'hover:bg-red-300',
        'focus:outline-none',
        'focus:shadow-outline'
    ],

    decreaseButton: [
        'decrease',
        'px-3',
        'py-1',
        'rounded',
        'bg-black',
        'text-white',
        'hover:bg-black-300',
        'focus:outline-none',
        'focus:shadow-outline'
    ],

    addToCartBtn: [
        'add-to-cart-btn',
        'px-4',
        'py-2',
        'rounded',
        'text-white',
        'font-bold',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'focus:outline-none',
        'focus:shadow-outline'
    ],
};

export function useStyle(type) {
    if (typeof type === 'string')
        return bookOfStyles[type];
    else {
        const allStyles= type.map((t) => bookOfStyles[t]);
        return allStyles.flat();
    }
}




