export function mergeAllAuthFields(authorizations) {
  return authorizations.reduce(
    (accumulator, currentValue) => [...accumulator, ...currentValue.fields],
    []
  );
}

export function getAuthForHome(authorizations, home) {
  return authorizations.find((auth) => auth.home === home) || undefined;
}

export function getAuthAccessTimePermission(authorization) {
  return {
    accessFrom: authorization.accessTimePermission?.from || undefined,
    accessTo: authorization.accessTimePermission?.to || undefined,
  };
}
