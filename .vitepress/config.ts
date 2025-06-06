import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme, type HeadConfig, type Plugin } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'اسناد',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'راهنما', link: '/guide/introduction' },
      { text: 'آموزش', link: '/tutorial/' },
      { text: 'مثال‌ها', link: '/examples/' },
      { text: 'شروع سریع', link: '/guide/quick-start' },
      // { text: 'Style Guide', link: '/style-guide/' },
      { text: 'واژه‌نامه', link: '/glossary/' },
      { text: 'ارجاع به خطا', link: '/error-reference/' },
      {
        text: 'اسناد Vue ۲',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'مهاجرت از Vue ۲',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: '(API) میانجی‌های برنامه نویسی',
    activeMatch: `^/api/`,
    link: '/api/'
  },
  {
    text: 'تفریحگاه',
    link: 'https://play.vuejs.org'
  },
  {
    text: 'اکوسیستم',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'منابع',
        items: [
          { text: 'همکاران', link: '/partners/' },
          { text: 'توسعه دهندگان', link: '/developers/' },
          { text: 'تم‌ها', link: '/ecosystem/themes' },
          { text: 'UI Components', link: 'https://ui-libs.vercel.app/' },
          {
            text: 'گواهی‌نامه',
            link: 'https://certificates.dev/vuejs/?ref=vuejs-nav'
          },
          { text: 'مشاغل', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'فروشگاه تیشرت', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'کتابخانه‌های رسمی',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          {
            text: 'رهنمای ابزارها',
            link: '/guide/scaling-up/tooling.html'
          }
        ]
      },
      {
        text: 'دوره‌های ویدیویی',
        items: [
          {
            text: 'Vue Mastery تارنمای',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue School تارنمای',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: 'کمک',
        items: [
          {
            text: 'چت دیسکورد',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'Discussions گیت‌هاب',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'DEV Community تارنمای', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'اخبار',
        items: [
          { text: 'وبلاگ', link: 'https://blog.vuejs.org/' },
          { text: 'توییتر', link: 'https://twitter.com/vuejs' },
          { text: 'رویدادها', link: 'https://events.vuejs.org/' },
          { text: 'خبرنامه‌ها', link: '/ecosystem/newsletters' }
        ]
      }
    ]
  },
  {
    text: 'درباره',
    activeMatch: `^/about/`,
    items: [
      { text: 'سوالات متداول', link: '/about/faq' },
      { text: 'تیم', link: '/about/team' },
      { text: 'انتشارات', link: '/about/releases' },
      {
        text: 'راهنمای کامیونیتی',
        link: '/about/community-guide'
      },
      { text: 'منشور اخلاقی', link: '/about/coc' },
      { text: 'حریم خصوصی', link: '/about/privacy' },
      {
        text: 'مستند',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'حامی',
    link: '/sponsor/'
  },
  {
    text: 'کارشناسان',
    badge: { text: 'جدید' },
    activeMatch: `^/(partners|developers)/`,
    items: [
      { text: 'شرکا', link: '/partners/' },
      { text: 'توسعه دهندگان', link: '/developers/', badge: { text: 'جدید' } }
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'آغاز',
      items: [
        { text: 'معرفی', link: '/guide/introduction' },
        {
          text: 'شروع سریع',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'الزامات',
      items: [
        {
          text: 'ایجاد یک اپلیکیشن Vue',
          link: '/guide/essentials/application'
        },
        {
          text: 'Template Syntax',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'مبانی Reactivity',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'پراپرتی‌های computed',
          link: '/guide/essentials/computed'
        },
        {
          text: 'اتصال کلاس و استایل',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'رندر شرطی',
          link: '/guide/essentials/conditional'
        },
        {
          text: 'رندر لیست',
          link: '/guide/essentials/list'
        },
        {
          text: 'مدیریت رویدادها',
          link: '/guide/essentials/event-handling'
        },
        {
          text: 'اتصال input در فرم',
          link: '/guide/essentials/forms'
        },
        { text: 'ناظرها - Watchers', link: '/guide/essentials/watchers' },
        {
          text: 'ارجاع از طریق تمپلیت - Template Refs',
          link: '/guide/essentials/template-refs'
        },
        {
          text: 'مبانی کامپوننت‌ها',
          link: '/guide/essentials/component-basics'
        },
        {
          text: 'هوک‌های چرخه حیات',
          link: '/guide/essentials/lifecycle'
        }
      ]
    },
    {
      text: 'کامپوننت‌ها به‌طور عمیق',
      items: [
        {
          text: 'ثبت کامپوننت',
          link: '/guide/components/registration'
        },
        { text: 'پراپ‌ها', link: '/guide/components/props' },
        {
          text: 'رویداد‌های کامپوننت',
          link: '/guide/components/events'
        },
        { text: 'v-model', link: '/guide/components/v-model' },
        {
          text: 'Fallthrough Attributes',
          link: '/guide/components/attrs'
        },
        { text: 'اسلات‌ها', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'کامپوننت‌های غیرهمگام - Async Components',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'قابلیت استفاده مجدد',
      items: [
        {
          text: 'Composables',
          link: '/guide/reusability/composables'
        },
        {
          text: 'دایرکتیوهای سفارشی',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'پلاگین‌ها', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'کامپوننت‌های داخلی',
      items: [
        { text: 'Transition', link: '/guide/built-ins/transition' },
        {
          text: 'TransitionGroup',
          link: '/guide/built-ins/transition-group'
        },
        { text: 'KeepAlive', link: '/guide/built-ins/keep-alive' },
        { text: 'Teleport', link: '/guide/built-ins/teleport' },
        { text: 'Suspense', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: 'Scaling Up',
      items: [
        {
          text: 'کامپوننت های تک فایلی - SFC',
          link: '/guide/scaling-up/sfc'
        },
        { text: 'ابزارها', link: '/guide/scaling-up/tooling' },
        { text: 'مسیریابی - Routing', link: '/guide/scaling-up/routing' },
        {
          text: 'State Management',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'Testing', link: '/guide/scaling-up/testing' },
        {
          text: 'رندرینگ سمت سرور - SSR',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'بهترین روش‌ها',
      items: [
        {
          text: 'Production Deployment',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'کارایی (Performance)',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'دسترسی‌پذیری',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'امنیت',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'تایپ‌اسکریپت',
      items: [
        { text: 'بررسی کلی', link: '/guide/typescript/overview' },
        {
          text: 'تایپ‌اسکریپت با API Composition',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'تایپ‌اسکریپت با API Options',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'موضوعات اضافی',
      items: [
        {
          text: 'روش‌های استفاده از Vue',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'سوالات متداول در مورد Composition API',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'واکنش‌پذیری به تفصیل',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'مکانیزم رندر',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'توابع رندر و JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue و کامپوننت‌های وب',
          link: '/guide/extras/web-components'
        },
        {
          text: 'تکنیک‌های انیمیشن',
          link: '/guide/extras/animation'
        }
        // {
        //   text: 'Building a Library for Vue',
        //   link: '/guide/extras/building-a-library'
        // },
        // {
        //   text: 'Vue for React Devs',
        //   link: '/guide/extras/vue-for-react-devs'
        // }
      ]
    }
  ],
  '/api/': [
    {
      text: 'Global API',
      items: [
        { text: 'Application', link: '/api/application' },
        {
          text: 'General',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Reactivity: Core',
          link: '/api/reactivity-core'
        },
        {
          text: 'Reactivity: Utilities',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Reactivity: Advanced',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Lifecycle Hooks',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'Dependency Injection',
          link: '/api/composition-api-dependency-injection'
        },
        {
          text: 'Helpers',
          link: '/api/composition-api-helpers'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: 'Options: State', link: '/api/options-state' },
        { text: 'Options: Rendering', link: '/api/options-rendering' },
        {
          text: 'Options: Lifecycle',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Options: Composition',
          link: '/api/options-composition'
        },
        { text: 'Options: Misc', link: '/api/options-misc' },
        {
          text: 'Component Instance',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'Built-ins',
      items: [
        { text: 'Directives', link: '/api/built-in-directives' },
        { text: 'Components', link: '/api/built-in-components' },
        {
          text: 'Special Elements',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Special Attributes',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Single-File Component',
      items: [
        { text: 'Syntax Specification', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS Features', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'Advanced APIs',
      items: [
        { text: 'Custom Elements', link: '/api/custom-elements' },
        { text: 'Render Function', link: '/api/render-function' },
        { text: 'Server-Side Rendering', link: '/api/ssr' },
        { text: 'TypeScript Utility Types', link: '/api/utility-types' },
        { text: 'Custom Renderer', link: '/api/custom-renderer' },
        { text: 'Compile-Time Flags', link: '/api/compile-time-flags' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'پایه',
      items: [
        {
          text: 'سلام دنیا',
          link: '/examples/#hello-world'
        },
        {
          text: 'مدیریت ورودی کاربر',
          link: '/examples/#handling-input'
        },
        {
          text: 'اتصال اتریبیوت‌ها',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'شرط‌ها و حلقه‌ها',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'اتصالات فرم',
          link: '/examples/#form-bindings'
        },
        {
          text: 'کامپوننت ساده',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'کاربردی',
      items: [
        {
          text: 'ویرایشگر Markdown',
          link: '/examples/#markdown'
        },
        {
          text: 'گرفتن داده',
          link: '/examples/#fetching-data'
        },
        {
          text: 'گرید با مرتب‌سازی و فیلتر',
          link: '/examples/#grid'
        },
        {
          text: 'نمای درختی',
          link: '/examples/#tree'
        },
        {
          text: 'نمودار SVG',
          link: '/examples/#svg'
        },
        {
          text: 'مودال با انیمیشن',
          link: '/examples/#modal'
        },
        {
          text: 'لیست با انیمیشن',
          link: '/examples/#list-transition'
        },
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: 'بنچمارک 7GUIs',
      items: [
        {
          text: 'شمارنده',
          link: '/examples/#counter'
        },
        {
          text: 'مبدل دما',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'رزرو پرواز',
          link: '/examples/#flight-booker'
        },
        {
          text: 'شمارنده',
          link: '/examples/#timer'
        },
        {
          text: 'عملیات CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'کشوی دایره‌ای',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'سلول‌های جدول',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'راهنمای استایل',
      items: [
        {
          text: 'بررسی اجمالی',
          link: '/style-guide/'
        },
        {
          text: 'A - ضروری‌',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - به شدت توصیه می‌شود',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - توصیه می‌شوند',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - با احتیاط از آنها استفاده کنید',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
const i18n: ThemeConfig['i18n'] = {
  menu: 'فهرست',
  toc: 'در این صفحه',
  previous: 'قبلی',
  next: 'بعدی',
  returnToTop: 'برگشت به بالا',
  appearance: 'ظاهر'
}

function inlineScript(file: string): HeadConfig {
  return [
    'script',
    {},
    fs.readFileSync(
      path.resolve(__dirname, `./inlined-scripts/${file}`),
      'utf-8'
    )
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https:/fa.vuejs.org'
  },

  lang: 'fa',
  dir: 'rtl',
  title: 'Vue.js',
  description: 'Vue.js - فریمورک پیش‌رونده جاوا اسکریپت',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://vuejs.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vue.js' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Vue.js - The Progressive JavaScript Framework'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://automation.vuejs.org'
      }
    ],
    inlineScript('restorePreference.js'),
    inlineScript('uwu.js'),
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://vueschool.io/banner.js?affiliate=vuejs&type=top',
        async: 'true'
      }
    ],
    inlineScript('perfops.js')
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    i18n,

    localeLinks: [
      {
        link: 'https://vuejs.org',
        text: 'English',
        repo: 'https://github.com/vuejs/docs'
      },
      {
        link: 'https://cn.vuejs.org',
        text: '简体中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-cn'
      },
      {
        link: 'https://ja.vuejs.org',
        text: '日本語',
        repo: 'https://github.com/vuejs-translations/docs-ja'
      },
      {
        link: 'https://ua.vuejs.org',
        text: 'Українська',
        repo: 'https://github.com/vuejs-translations/docs-uk'
      },
      {
        link: 'https://fr.vuejs.org',
        text: 'Français',
        repo: 'https://github.com/vuejs-translations/docs-fr'
      },
      {
        link: 'https://ko.vuejs.org',
        text: '한국어',
        repo: 'https://github.com/vuejs-translations/docs-ko'
      },
      {
        link: 'https://pt.vuejs.org',
        text: 'Português',
        repo: 'https://github.com/vuejs-translations/docs-pt'
      },
      {
        link: 'https://bn.vuejs.org',
        text: 'বাংলা',
        repo: 'https://github.com/vuejs-translations/docs-bn'
      },
      {
        link: 'https://it.vuejs.org',
        text: 'Italiano',
        repo: 'https://github.com/vuejs-translations/docs-it'
      },
      {
        link: 'https://fa.vuejs.org',
        text: 'فارسی',
        repo: 'https://github.com/vuejs-translations/docs-fa'
      },
      {
        link: 'https://ru.vuejs.org',
        text: 'Русский',
        repo: 'https://github.com/vuejs-translations/docs-ru'
      },
      {
        link: 'https://cs.vuejs.org',
        text: 'Čeština',
        repo: 'https://github.com/vuejs-translations/docs-cs'
      },
      {
        link: 'https://zh-hk.vuejs.org',
        text: '繁體中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-hk'
      },
      {
        link: 'https://pl.vuejs.org',
        text: 'Polski',
        repo: 'https://github.com/vuejs-translations/docs-pl',
      },
      {
        link: '/translations/',
        text: 'به ما در ترجمه کمک کنید!',
        isTranslationsDesc: true
      }
    ],

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: '21cf9df0734770a2448a9da64a700c22',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/vue' }
    ],

    editLink: {
      repo: 'vuejs-translations/docs-fa',
      text: 'اصلاح ترجمه این صفحه در گیت‌هاب'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
})
