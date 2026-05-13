export function resolveAppVariant(value) {
  return value === 'development' ? 'development' : 'production';
}

export function getNativeAppVariantConfig(variant) {
  if (variant === 'development') {
    return {
      appName: 'Echo Dev',
      appVariant: variant,
      bundleIdentifier: 'com.synonymy.echo.dev',
      packageName: 'com.synonymy.echo.dev',
      scheme: 'echo-dev',
      slug: 'echo-dev',
    };
  }

  return {
    appName: 'Echo',
    appVariant: variant,
    bundleIdentifier: 'com.synonymy.echo',
    packageName: 'com.synonymy.echo',
    scheme: 'echo',
    slug: 'echo',
  };
}
