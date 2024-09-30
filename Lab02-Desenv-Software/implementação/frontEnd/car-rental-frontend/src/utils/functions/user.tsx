const agentRoles = {['EMPRESA'] : true, ['BANCO']: true};


export const isAgent = (roles: string[]): boolean => {
    return roles.some(role => agentRoles[role]);
};

export const isEnterprise = (roles: string[]): boolean => {
    return roles.includes('EMPRESA');
};

export const isBank = (roles: string[]): boolean => {
    return roles.includes('BANCO');
};